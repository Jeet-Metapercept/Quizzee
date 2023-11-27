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
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      question_bank: {
        Row: {
          answers: string[] | null
          author: string | null
          category: string | null
          created_at: string
          difficulty: number | null
          id: number
          published: boolean | null
          question: Json | null
          tags: string[] | null
          updated_at: string | null
          views: number | null
        }
        Insert: {
          answers?: string[] | null
          author?: string | null
          category?: string | null
          created_at?: string
          difficulty?: number | null
          id?: number
          published?: boolean | null
          question?: Json | null
          tags?: string[] | null
          updated_at?: string | null
          views?: number | null
        }
        Update: {
          answers?: string[] | null
          author?: string | null
          category?: string | null
          created_at?: string
          difficulty?: number | null
          id?: number
          published?: boolean | null
          question?: Json | null
          tags?: string[] | null
          updated_at?: string | null
          views?: number | null
        }
        Relationships: []
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
