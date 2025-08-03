-- Enable realtime for collaboration
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User profiles table for collaboration features
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  plan_type TEXT NOT NULL DEFAULT 'individual' CHECK (plan_type IN ('individual', 'professional', 'enterprise')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Collaboration sessions table
CREATE TABLE public.collaboration_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('whiteboard', 'mindmap', 'presentation', 'strategy')),
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  settings JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Session participants table
CREATE TABLE public.session_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.collaboration_sessions(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL DEFAULT 'viewer' CHECK (role IN ('owner', 'editor', 'viewer')),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(session_id, user_id)
);

-- Document operations for operational transformation
CREATE TABLE public.document_operations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.collaboration_sessions(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  operation_type TEXT NOT NULL CHECK (operation_type IN ('insert', 'delete', 'update', 'move')),
  operation_data JSONB NOT NULL,
  vector_clock JSONB NOT NULL,
  timestamp_ms BIGINT NOT NULL,
  applied BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Document state snapshots
CREATE TABLE public.document_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.collaboration_sessions(id) ON DELETE CASCADE NOT NULL,
  snapshot_data JSONB NOT NULL,
  version_number INTEGER NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User presence tracking
CREATE TABLE public.user_presence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.collaboration_sessions(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  cursor_position JSONB,
  selection JSONB,
  is_online BOOLEAN DEFAULT true,
  last_heartbeat TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(session_id, user_id)
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collaboration_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_operations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_presence ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for collaboration sessions
CREATE POLICY "Users can view sessions they own or participate in" ON public.collaboration_sessions 
FOR SELECT USING (
  owner_id = auth.uid() OR 
  EXISTS (
    SELECT 1 FROM public.session_participants 
    WHERE session_id = collaboration_sessions.id AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can create sessions" ON public.collaboration_sessions 
FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can update sessions" ON public.collaboration_sessions 
FOR UPDATE USING (owner_id = auth.uid());

CREATE POLICY "Owners can delete sessions" ON public.collaboration_sessions 
FOR DELETE USING (owner_id = auth.uid());

-- RLS Policies for session participants
CREATE POLICY "Users can view participants in their sessions" ON public.session_participants 
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.collaboration_sessions 
    WHERE id = session_id AND (
      owner_id = auth.uid() OR 
      EXISTS (
        SELECT 1 FROM public.session_participants sp2 
        WHERE sp2.session_id = session_id AND sp2.user_id = auth.uid()
      )
    )
  )
);

CREATE POLICY "Session owners can manage participants" ON public.session_participants 
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.collaboration_sessions 
    WHERE id = session_id AND owner_id = auth.uid()
  )
);

-- RLS Policies for document operations
CREATE POLICY "Users can view operations in their sessions" ON public.document_operations 
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.session_participants 
    WHERE session_id = document_operations.session_id AND user_id = auth.uid()
  )
);

CREATE POLICY "Session editors can insert operations" ON public.document_operations 
FOR INSERT WITH CHECK (
  auth.uid() = user_id AND
  EXISTS (
    SELECT 1 FROM public.session_participants 
    WHERE session_id = document_operations.session_id 
    AND user_id = auth.uid() 
    AND role IN ('owner', 'editor')
  )
);

-- RLS Policies for document snapshots
CREATE POLICY "Users can view snapshots in their sessions" ON public.document_snapshots 
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.session_participants 
    WHERE session_id = document_snapshots.session_id AND user_id = auth.uid()
  )
);

CREATE POLICY "Session editors can create snapshots" ON public.document_snapshots 
FOR INSERT WITH CHECK (
  auth.uid() = created_by AND
  EXISTS (
    SELECT 1 FROM public.session_participants 
    WHERE session_id = document_snapshots.session_id 
    AND user_id = auth.uid() 
    AND role IN ('owner', 'editor')
  )
);

-- RLS Policies for user presence
CREATE POLICY "Users can view presence in their sessions" ON public.user_presence 
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.session_participants 
    WHERE session_id = user_presence.session_id AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can update own presence" ON public.user_presence 
FOR ALL USING (auth.uid() = user_id);

-- Enable realtime
ALTER TABLE public.collaboration_sessions REPLICA IDENTITY FULL;
ALTER TABLE public.session_participants REPLICA IDENTITY FULL;
ALTER TABLE public.document_operations REPLICA IDENTITY FULL;
ALTER TABLE public.user_presence REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.collaboration_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.session_participants;
ALTER PUBLICATION supabase_realtime ADD TABLE public.document_operations;
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_presence;

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_sessions_updated_at BEFORE UPDATE ON public.collaboration_sessions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to check user plan permissions
CREATE OR REPLACE FUNCTION public.can_collaborate(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = can_collaborate.user_id 
    AND plan_type IN ('professional', 'enterprise')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Indexes for performance
CREATE INDEX idx_session_participants_session_id ON public.session_participants(session_id);
CREATE INDEX idx_session_participants_user_id ON public.session_participants(user_id);
CREATE INDEX idx_document_operations_session_id ON public.document_operations(session_id);
CREATE INDEX idx_document_operations_timestamp ON public.document_operations(timestamp_ms);
CREATE INDEX idx_user_presence_session_id ON public.user_presence(session_id);
CREATE INDEX idx_user_presence_user_id ON public.user_presence(user_id);