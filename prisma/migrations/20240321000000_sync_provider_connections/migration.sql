-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateTable
CREATE TABLE "provider_connections" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "auth_user_id" UUID NOT NULL,
    "provider" TEXT NOT NULL,
    "access_token" TEXT NOT NULL,
    "refresh_token" TEXT,
    "expires_at" TIMESTAMPTZ(6),
    "scopes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "is_active" BOOLEAN DEFAULT true,

    CONSTRAINT "provider_connections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "provider_connections_auth_user_id_provider_key" ON "provider_connections"("auth_user_id", "provider");

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_provider_connections_updated_at
    BEFORE UPDATE ON "provider_connections"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Note: RLS policies are managed by Supabase and should be added separately
-- through the Supabase dashboard or using the Supabase CLI
-- The following policies are for reference only:
/*
ALTER TABLE "provider_connections" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own provider connections"
    ON "provider_connections" FOR SELECT
    USING (auth.uid() = auth_user_id);

CREATE POLICY "Users can insert their own provider connections"
    ON "provider_connections" FOR INSERT
    WITH CHECK (auth.uid() = auth_user_id);

CREATE POLICY "Users can update their own provider connections"
    ON "provider_connections" FOR UPDATE
    USING (auth.uid() = auth_user_id);
*/ 