export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          collage: string | null
          created_at: string
          department: string | null
          email: string | null
          id: string
          is_admin: boolean | null
          role: string | null
        }
        Insert: {
          collage?: string | null
          created_at?: string
          department?: string | null
          email?: string | null
          id: string
          is_admin?: boolean | null
          role?: string | null
        }
        Update: {
          collage?: string | null
          created_at?: string
          department?: string | null
          email?: string | null
          id?: string
          is_admin?: boolean | null
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey'
            columns: ['id']
            isOneToOne: true
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
