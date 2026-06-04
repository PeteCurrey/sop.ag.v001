export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type SopStatus = 'draft' | 'active' | 'archived' | 'under_review'
export type UserRole = 'admin' | 'member' | 'viewer'
export type PlanTier = 'trial' | 'starter' | 'growth' | 'enterprise'
export type SubscriptionStatus = 'active' | 'trialing' | 'past_due' | 'cancelled'

export interface SopContentStep {
  step_number: number
  title: string
  description: string
  responsible_role: string
  warning: string | null
  is_critical: boolean
  checklist_items: string[]
}

export interface SopContent {
  purpose: string
  scope: string
  roles_involved: string[]
  equipment_required: string[]
  steps: SopContentStep[]
  references: string[]
  review_notes: string
}

export interface Database {
  public: {
    Tables: {
      organisations: {
        Row: {
          id: string
          name: string
          slug: string
          logo_url: string | null
          plan_tier: PlanTier
          subscription_status: SubscriptionStatus
          subscription_end_date: string | null
          trial_ends_at: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscription_tier: 'free' | PlanTier
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          logo_url?: string | null
          plan_tier?: PlanTier
          subscription_status?: SubscriptionStatus
          subscription_end_date?: string | null
          trial_ends_at?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_tier?: 'free' | PlanTier
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          logo_url?: string | null
          plan_tier?: PlanTier
          subscription_status?: SubscriptionStatus
          subscription_end_date?: string | null
          trial_ends_at?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_tier?: 'free' | PlanTier
          created_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          organisation_id: string | null
          full_name: string | null
          email: string | null
          role: UserRole
          avatar_url: string | null
          created_at: string
        }
        Insert: {
          id: string
          organisation_id?: string | null
          full_name?: string | null
          email?: string | null
          role?: UserRole
          avatar_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          organisation_id?: string | null
          full_name?: string | null
          email?: string | null
          role?: UserRole
          avatar_url?: string | null
          created_at?: string
        }
        Relationships: []
      }
      departments: {
        Row: {
          id: string
          organisation_id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          organisation_id: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          organisation_id?: string
          name?: string
          created_at?: string
        }
        Relationships: []
      }
      sops: {
        Row: {
          id: string
          organisation_id: string
          title: string
          description: string | null
          category: string | null
          department_id: string | null
          status: SopStatus
          version: number
          current_version_id: string | null
          review_frequency_days: number | null
          next_review_date: string | null
          created_by: string | null
          created_at: string
          updated_at: string
          public_share_token: string | null
        }
        Insert: {
          id?: string
          organisation_id: string
          title: string
          description?: string | null
          category?: string | null
          department_id?: string | null
          status?: SopStatus
          version?: number
          current_version_id?: string | null
          review_frequency_days?: number | null
          next_review_date?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
          public_share_token?: string | null
        }
        Update: {
          id?: string
          organisation_id?: string
          title?: string
          description?: string | null
          category?: string | null
          department_id?: string | null
          status?: SopStatus
          version?: number
          current_version_id?: string | null
          review_frequency_days?: number | null
          next_review_date?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
          public_share_token?: string | null
        }
        Relationships: []
      }
      sop_versions: {
        Row: {
          id: string
          sop_id: string
          version_number: number
          content: SopContent
          change_summary: string | null
          published_by: string | null
          published_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          sop_id: string
          version_number: number
          content: SopContent
          change_summary?: string | null
          published_by?: string | null
          published_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          sop_id?: string
          version_number?: number
          content?: SopContent
          change_summary?: string | null
          published_by?: string | null
          published_at?: string | null
          created_at?: string
        }
        Relationships: []
      }
      sop_steps: {
        Row: {
          id: string
          sop_version_id: string
          step_number: number
          title: string
          description: string | null
          responsible_role: string | null
          warning: string | null
          is_critical: boolean
          created_at: string
        }
        Insert: {
          id?: string
          sop_version_id: string
          step_number: number
          title: string
          description?: string | null
          responsible_role?: string | null
          warning?: string | null
          is_critical?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          sop_version_id?: string
          step_number?: number
          title?: string
          description?: string | null
          responsible_role?: string | null
          warning?: string | null
          is_critical?: boolean
          created_at?: string
        }
        Relationships: []
      }
      sop_assignments: {
        Row: {
          id: string
          sop_id: string
          assigned_to_user: string | null
          assigned_to_dept: string | null
          assigned_by: string | null
          due_date: string | null
          created_at: string
        }
        Insert: {
          id?: string
          sop_id: string
          assigned_to_user?: string | null
          assigned_to_dept?: string | null
          assigned_by?: string | null
          due_date?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          sop_id?: string
          assigned_to_user?: string | null
          assigned_to_dept?: string | null
          assigned_by?: string | null
          due_date?: string | null
          created_at?: string
        }
        Relationships: []
      }
      sop_signoffs: {
        Row: {
          id: string
          sop_id: string
          sop_version_id: string
          user_id: string
          signed_at: string
          ip_address: string | null
          notes: string | null
        }
        Insert: {
          id?: string
          sop_id: string
          sop_version_id: string
          user_id: string
          signed_at?: string
          ip_address?: string | null
          notes?: string | null
        }
        Update: {
          id?: string
          sop_id?: string
          sop_version_id?: string
          user_id?: string
          signed_at?: string
          ip_address?: string | null
          notes?: string | null
        }
        Relationships: []
      }
      ai_generation_log: {
        Row: {
          id: string
          organisation_id: string
          user_id: string
          prompt_input: string
          generated_content: Json
          sop_id: string | null
          tokens_used: number | null
          created_at: string
        }
        Insert: {
          id?: string
          organisation_id: string
          user_id: string
          prompt_input: string
          generated_content: Json
          sop_id?: string | null
          tokens_used?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          organisation_id?: string
          user_id?: string
          prompt_input?: string
          generated_content?: Json
          sop_id?: string | null
          tokens_used?: number | null
          created_at?: string
        }
        Relationships: []
      }
      audit_log: {
        Row: {
          id: string
          organisation_id: string
          user_id: string | null
          action: string
          entity_type: string | null
          entity_id: string | null
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          organisation_id: string
          user_id?: string | null
          action: string
          entity_type?: string | null
          entity_id?: string | null
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          organisation_id?: string
          user_id?: string | null
          action?: string
          entity_type?: string | null
          entity_id?: string | null
          metadata?: Json | null
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
