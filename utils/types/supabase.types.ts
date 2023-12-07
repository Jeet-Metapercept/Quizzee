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
      category: {
        Row: {
          created_at: string
          created_by: string | null
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
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
      question_bank: {
        Row: {
          answers: Json | null
          author: string | null
          category: string | null
          created_at: string
          difficulty: number | null
          id: number
          published: boolean | null
          question: Json | null
          tags: string[] | null
          updated_at: string | null
          view_only_answers: Json | null
          views: number | null
        }
        Insert: {
          answers?: Json | null
          author?: string | null
          category?: string | null
          created_at?: string
          difficulty?: number | null
          id?: number
          published?: boolean | null
          question?: Json | null
          tags?: string[] | null
          updated_at?: string | null
          view_only_answers?: Json | null
          views?: number | null
        }
        Update: {
          answers?: Json | null
          author?: string | null
          category?: string | null
          created_at?: string
          difficulty?: number | null
          id?: number
          published?: boolean | null
          question?: Json | null
          tags?: string[] | null
          updated_at?: string | null
          view_only_answers?: Json | null
          views?: number | null
        }
        Relationships: []
      }
      quiz_bank: {
        Row: {
          author: string | null
          category: string | null
          created_at: string
          description: string | null
          difficulty: number | null
          direct_link: string | null
          id: string
          image_url: string | null
          max_time: number | null
          name: string | null
          published: boolean | null
          questions: string[] | null
          randomize: boolean | null
          show_results: boolean | null
          size: number | null
          views: number | null
        }
        Insert: {
          author?: string | null
          category?: string | null
          created_at?: string
          description?: string | null
          difficulty?: number | null
          direct_link?: string | null
          id?: string
          image_url?: string | null
          max_time?: number | null
          name?: string | null
          published?: boolean | null
          questions?: string[] | null
          randomize?: boolean | null
          show_results?: boolean | null
          size?: number | null
          views?: number | null
        }
        Update: {
          author?: string | null
          category?: string | null
          created_at?: string
          description?: string | null
          difficulty?: number | null
          direct_link?: string | null
          id?: string
          image_url?: string | null
          max_time?: number | null
          name?: string | null
          published?: boolean | null
          questions?: string[] | null
          randomize?: boolean | null
          show_results?: boolean | null
          size?: number | null
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

export type Tables<
  PublicTableNameOrOptions extends
  | keyof (Database['public']['Tables'] & Database['public']['Views'])
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
    Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
    Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
      ? R
      : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
  Database['public']['Views'])
    ? (Database['public']['Tables'] &
      Database['public']['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
        ? R
        : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
  | keyof Database['public']['Tables']
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
    Insert: infer I
  }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
  | keyof Database['public']['Tables']
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
    Update: infer U
  }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U
    }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
  | keyof Database['public']['Enums']
  | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
    ? Database['public']['Enums'][PublicEnumNameOrOptions]
    : never
