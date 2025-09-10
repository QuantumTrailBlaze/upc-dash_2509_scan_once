export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      agents: {
        Row: {
          created_at: string
          endpoint_url: string
          id: string
          name: string
          status: string
          system_prompt: string | null
          tone_smoothing_alpha: number | null
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          endpoint_url: string
          id?: string
          name: string
          status?: string
          system_prompt?: string | null
          tone_smoothing_alpha?: number | null
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          endpoint_url?: string
          id?: string
          name?: string
          status?: string
          system_prompt?: string | null
          tone_smoothing_alpha?: number | null
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      book_list: {
        Row: {
          author: string | null
          category: string | null
          created_at: string
          description: string | null
          google_books_id: string
          id: number
          image_url: string | null
          isbn13: string | null
          referral_link: string | null
          title: string
        }
        Insert: {
          author?: string | null
          category?: string | null
          created_at?: string
          description?: string | null
          google_books_id: string
          id?: number
          image_url?: string | null
          isbn13?: string | null
          referral_link?: string | null
          title: string
        }
        Update: {
          author?: string | null
          category?: string | null
          created_at?: string
          description?: string | null
          google_books_id?: string
          id?: number
          image_url?: string | null
          isbn13?: string | null
          referral_link?: string | null
          title?: string
        }
        Relationships: []
      }
      book_rag_data: {
        Row: {
          author: string | null
          book_id: number
          category: string | null
          description_for_embedding: string
          embedding: string
          google_books_id: string | null
          image_url: string | null
          isbn13: string | null
          last_embedded_at: string | null
          referral_link: string | null
          title: string
        }
        Insert: {
          author?: string | null
          book_id: number
          category?: string | null
          description_for_embedding: string
          embedding: string
          google_books_id?: string | null
          image_url?: string | null
          isbn13?: string | null
          last_embedded_at?: string | null
          referral_link?: string | null
          title: string
        }
        Update: {
          author?: string | null
          book_id?: number
          category?: string | null
          description_for_embedding?: string
          embedding?: string
          google_books_id?: string | null
          image_url?: string | null
          isbn13?: string | null
          last_embedded_at?: string | null
          referral_link?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_book_list_original"
            columns: ["book_id"]
            isOneToOne: true
            referencedRelation: "book_list"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      conversation_metadata: {
        Row: {
          generated_at: string | null
          last_updated_at: string | null
          session_id: string
          summary: string | null
          title: string | null
          user_id: string
        }
        Insert: {
          generated_at?: string | null
          last_updated_at?: string | null
          session_id: string
          summary?: string | null
          title?: string | null
          user_id: string
        }
        Update: {
          generated_at?: string | null
          last_updated_at?: string | null
          session_id?: string
          summary?: string | null
          title?: string | null
          user_id?: string
        }
        Relationships: []
      }
      doc_pages: {
        Row: {
          chunk_number: number
          content: string
          created_at: string
          embedding: string | null
          file_title: string
          id: number
          metadata: Json
          summary: string
          title: string
        }
        Insert: {
          chunk_number: number
          content: string
          created_at?: string
          embedding?: string | null
          file_title: string
          id?: number
          metadata?: Json
          summary: string
          title: string
        }
        Update: {
          chunk_number?: number
          content?: string
          created_at?: string
          embedding?: string | null
          file_title?: string
          id?: number
          metadata?: Json
          summary?: string
          title?: string
        }
        Relationships: []
      }
      documents: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      mentor_files: {
        Row: {
          checksum: string | null
          file_name: string
          file_size: number | null
          file_type: string | null
          id: string
          metadata: Json | null
          rag_status: string
          storage_object_path: string
          uploaded_at: string
          user_id: string
        }
        Insert: {
          checksum?: string | null
          file_name: string
          file_size?: number | null
          file_type?: string | null
          id?: string
          metadata?: Json | null
          rag_status?: string
          storage_object_path: string
          uploaded_at?: string
          user_id: string
        }
        Update: {
          checksum?: string | null
          file_name?: string
          file_size?: number | null
          file_type?: string | null
          id?: string
          metadata?: Json | null
          rag_status?: string
          storage_object_path?: string
          uploaded_at?: string
          user_id?: string
        }
        Relationships: []
      }
      mentor_pages: {
        Row: {
          chunk_number: number
          content: string
          created_at: string
          embedding: string | null
          file_name: string
          id: number
          metadata: Json
          summary: string
          title: string
          user_id: string
        }
        Insert: {
          chunk_number: number
          content: string
          created_at?: string
          embedding?: string | null
          file_name: string
          id?: number
          metadata?: Json
          summary: string
          title: string
          user_id: string
        }
        Update: {
          chunk_number?: number
          content?: string
          created_at?: string
          embedding?: string | null
          file_name?: string
          id?: number
          metadata?: Json
          summary?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          created_at: string | null
          id: string
          message: Json
          request_id: string
          session_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: Json
          request_id: string
          session_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: Json
          request_id?: string
          session_id?: string
          user_id?: string
        }
        Relationships: []
      }
      onboarding_paths: {
        Row: {
          created_at: string
          description: string | null
          display_name: string
          is_active: boolean
          path_key: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_name: string
          is_active?: boolean
          path_key: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_name?: string
          is_active?: boolean
          path_key?: string
        }
        Relationships: []
      }
      onboarding_steps: {
        Row: {
          created_at: string
          options: Json | null
          path_key: string
          question_text: string | null
          response_type: string
          save_as: Json | null
          step_key: string
          step_order: number
        }
        Insert: {
          created_at?: string
          options?: Json | null
          path_key: string
          question_text?: string | null
          response_type: string
          save_as?: Json | null
          step_key: string
          step_order: number
        }
        Update: {
          created_at?: string
          options?: Json | null
          path_key?: string
          question_text?: string | null
          response_type?: string
          save_as?: Json | null
          step_key?: string
          step_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_steps_path_key_fkey"
            columns: ["path_key"]
            isOneToOne: false
            referencedRelation: "onboarding_paths"
            referencedColumns: ["path_key"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          role: string
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id: string
          role?: string
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          role?: string
        }
        Relationships: []
      }
      quote_categories_junction: {
        Row: {
          category_id: number
          quote_id: number
        }
        Insert: {
          category_id: number
          quote_id: number
        }
        Update: {
          category_id?: number
          quote_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "quote_categories_junction_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quote_categories_junction_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      quote_embeddings_rag: {
        Row: {
          author: string | null
          categories: string[] | null
          created_at: string
          embedding: string
          quote_id: number
          quote_text_for_embedding: string
        }
        Insert: {
          author?: string | null
          categories?: string[] | null
          created_at?: string
          embedding: string
          quote_id: number
          quote_text_for_embedding: string
        }
        Update: {
          author?: string | null
          categories?: string[] | null
          created_at?: string
          embedding?: string
          quote_id?: number
          quote_text_for_embedding?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_quote_original"
            columns: ["quote_id"]
            isOneToOne: true
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      quotes: {
        Row: {
          author: string | null
          created_at: string
          id: number
          quote_text: string
          source: string | null
        }
        Insert: {
          author?: string | null
          created_at?: string
          id?: number
          quote_text: string
          source?: string | null
        }
        Update: {
          author?: string | null
          created_at?: string
          id?: number
          quote_text?: string
          source?: string | null
        }
        Relationships: []
      }
      rag_docs_mcp_ollama: {
        Row: {
          chunk_number: number
          content: string
          created_at: string
          embedding: string | null
          file_name: string
          id: number
          metadata: Json
          summary: string
          title: string
          user_id: string
        }
        Insert: {
          chunk_number: number
          content: string
          created_at?: string
          embedding?: string | null
          file_name: string
          id?: number
          metadata?: Json
          summary: string
          title: string
          user_id: string
        }
        Update: {
          chunk_number?: number
          content?: string
          created_at?: string
          embedding?: string | null
          file_name?: string
          id?: number
          metadata?: Json
          summary?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      rag_user_docs: {
        Row: {
          chunk_number: number
          content: string
          created_at: string
          embedding: string | null
          file_name: string
          id: number
          metadata: Json
          summary: string
          title: string
          user_id: string
        }
        Insert: {
          chunk_number: number
          content: string
          created_at?: string
          embedding?: string | null
          file_name: string
          id?: number
          metadata?: Json
          summary: string
          title: string
          user_id: string
        }
        Update: {
          chunk_number?: number
          content?: string
          created_at?: string
          embedding?: string | null
          file_name?: string
          id?: number
          metadata?: Json
          summary?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      site_pages: {
        Row: {
          chunk_number: number
          content: string
          created_at: string
          embedding: string | null
          id: number
          metadata: Json
          summary: string
          title: string
          url: string
        }
        Insert: {
          chunk_number: number
          content: string
          created_at?: string
          embedding?: string | null
          id?: number
          metadata?: Json
          summary: string
          title: string
          url: string
        }
        Update: {
          chunk_number?: number
          content?: string
          created_at?: string
          embedding?: string | null
          id?: number
          metadata?: Json
          summary?: string
          title?: string
          url?: string
        }
        Relationships: []
      }
      tone_profiles: {
        Row: {
          key_phrases: string[]
          profile: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          key_phrases?: string[]
          profile: Json
          updated_at?: string
          user_id: string
        }
        Update: {
          key_phrases?: string[]
          profile?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_book_recommendations: {
        Row: {
          book_id: number
          last_interaction_hash: string | null
          reason: string | null
          recommended_at: string
          user_id: string
        }
        Insert: {
          book_id: number
          last_interaction_hash?: string | null
          reason?: string | null
          recommended_at?: string
          user_id: string
        }
        Update: {
          book_id?: number
          last_interaction_hash?: string | null
          reason?: string | null
          recommended_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_book"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "book_list"
            referencedColumns: ["id"]
          },
        ]
      }
      user_files: {
        Row: {
          checksum: string | null
          file_name: string
          file_size: number | null
          file_type: string | null
          id: string
          metadata: Json | null
          rag_status: string
          storage_object_path: string
          uploaded_at: string
          user_id: string
        }
        Insert: {
          checksum?: string | null
          file_name: string
          file_size?: number | null
          file_type?: string | null
          id?: string
          metadata?: Json | null
          rag_status?: string
          storage_object_path: string
          uploaded_at?: string
          user_id: string
        }
        Update: {
          checksum?: string | null
          file_name?: string
          file_size?: number | null
          file_type?: string | null
          id?: string
          metadata?: Json | null
          rag_status?: string
          storage_object_path?: string
          uploaded_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_pages: {
        Row: {
          chunk_number: number
          content: string
          created_at: string
          embedding: string | null
          file_name: string
          id: number
          metadata: Json
          summary: string
          title: string
          user_id: string
        }
        Insert: {
          chunk_number: number
          content: string
          created_at?: string
          embedding?: string | null
          file_name: string
          id?: number
          metadata?: Json
          summary: string
          title: string
          user_id: string
        }
        Update: {
          chunk_number?: number
          content?: string
          created_at?: string
          embedding?: string | null
          file_name?: string
          id?: number
          metadata?: Json
          summary?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          accountability_style: string | null
          additional_context: string | null
          age: number | null
          areas_of_support: string[] | null
          checkin_frequency: string | null
          created_at: string
          demotivator: string | null
          discipline_challenge: string | null
          evening_energy_desc: string | null
          focus_domain: string | null
          gender: string | null
          main_distraction: string | null
          morning_routine_desc: string | null
          motivation_driver: string | null
          nudging_comfort: string | null
          onboarding_completed_at: string | null
          onboarding_path_taken: string | null
          onboarding_step: string | null
          preferred_coaching_style: string | null
          preferred_name: string | null
          primary_goal_text: string | null
          procrastination_level: string | null
          sleep_quality: string | null
          success_vision: string | null
          timezone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          accountability_style?: string | null
          additional_context?: string | null
          age?: number | null
          areas_of_support?: string[] | null
          checkin_frequency?: string | null
          created_at?: string
          demotivator?: string | null
          discipline_challenge?: string | null
          evening_energy_desc?: string | null
          focus_domain?: string | null
          gender?: string | null
          main_distraction?: string | null
          morning_routine_desc?: string | null
          motivation_driver?: string | null
          nudging_comfort?: string | null
          onboarding_completed_at?: string | null
          onboarding_path_taken?: string | null
          onboarding_step?: string | null
          preferred_coaching_style?: string | null
          preferred_name?: string | null
          primary_goal_text?: string | null
          procrastination_level?: string | null
          sleep_quality?: string | null
          success_vision?: string | null
          timezone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          accountability_style?: string | null
          additional_context?: string | null
          age?: number | null
          areas_of_support?: string[] | null
          checkin_frequency?: string | null
          created_at?: string
          demotivator?: string | null
          discipline_challenge?: string | null
          evening_energy_desc?: string | null
          focus_domain?: string | null
          gender?: string | null
          main_distraction?: string | null
          morning_routine_desc?: string | null
          motivation_driver?: string | null
          nudging_comfort?: string | null
          onboarding_completed_at?: string | null
          onboarding_path_taken?: string | null
          onboarding_step?: string | null
          preferred_coaching_style?: string | null
          preferred_name?: string | null
          primary_goal_text?: string | null
          procrastination_level?: string | null
          sleep_quality?: string | null
          success_vision?: string | null
          timezone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_quote_recommendations: {
        Row: {
          last_interaction_hash: string | null
          quote_id: number
          reason: string | null
          recommended_at: string
          user_id: string
        }
        Insert: {
          last_interaction_hash?: string | null
          quote_id: number
          reason?: string | null
          recommended_at?: string
          user_id: string
        }
        Update: {
          last_interaction_hash?: string | null
          quote_id?: number
          reason?: string | null
          recommended_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_quote_highlight"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      cleanup_user_book_recommendations: {
        Args: { retention_days?: number }
        Returns: undefined
      }
      cleanup_user_quote_recommendations: {
        Args: { retention_days?: number }
        Returns: undefined
      }
      get_user_conversation_summaries: {
        Args: { p_user_id: string }
        Returns: {
          first_message_at: string
          last_message_at: string
          message_count: number
          session_id: string
          title: string
          user_id: string
        }[]
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: string
      }
      match_books_for_rag: {
        Args: {
          filter_category?: string
          match_count?: number
          min_similarity?: number
          query_embedding: string
        }
        Returns: {
          author: string
          book_id: number
          category: string
          description_for_embedding: string
          google_books_id: string
          image_url: string
          isbn13: string
          referral_link: string
          similarity: number
          title: string
        }[]
      }
      match_doc_pages: {
        Args: { filter?: Json; match_count?: number; query_embedding: string }
        Returns: {
          chunk_number: number
          content: string
          file_title: string
          id: number
          metadata: Json
          similarity: number
          summary: string
          title: string
        }[]
      }
      match_documents: {
        Args: { filter?: Json; match_count?: number; query_embedding: string }
        Returns: {
          content: string
          id: number
          metadata: Json
          similarity: number
        }[]
      }
      match_mentor_pages: {
        Args: { filter?: Json; match_count?: number; query_embedding: string }
        Returns: {
          chunk_number: number
          content: string
          file_name: string
          id: number
          metadata: Json
          similarity: number
          summary: string
          title: string
          user_id: string
        }[]
      }
      match_quotes_for_rag: {
        Args: {
          match_count?: number
          min_similarity?: number
          p_filter_categories?: string[]
          query_embedding: string
        }
        Returns: {
          author: string
          categories: string[]
          quote_id: number
          quote_text: string
          similarity: number
        }[]
      }
      match_rag_docs_mcp_ollama: {
        Args: { filter?: Json; match_count?: number; query_embedding: string }
        Returns: {
          chunk_number: number
          content: string
          file_name: string
          id: number
          metadata: Json
          similarity: number
          summary: string
          title: string
          user_id: string
        }[]
      }
      match_rag_docs_ollama: {
        Args: { filter?: Json; match_count?: number; query_embedding: string }
        Returns: {
          chunk_number: number
          content: string
          file_name: string
          id: number
          metadata: Json
          similarity: number
          summary: string
          title: string
          user_id: string
        }[]
      }
      match_rag_user_docs: {
        Args: { filter?: Json; match_count?: number; query_embedding: string }
        Returns: {
          chunk_number: number
          content: string
          file_name: string
          id: number
          metadata: Json
          similarity: number
          summary: string
          title: string
          user_id: string
        }[]
      }
      match_rag_user_docs_ollama: {
        Args: { filter?: Json; match_count?: number; query_embedding: string }
        Returns: {
          chunk_number: number
          content: string
          file_name: string
          id: number
          metadata: Json
          similarity: number
          summary: string
          title: string
          user_id: string
        }[]
      }
      match_site_pages: {
        Args: { filter?: Json; match_count?: number; query_embedding: string }
        Returns: {
          chunk_number: number
          content: string
          id: number
          metadata: Json
          similarity: number
          summary: string
          title: string
          url: string
        }[]
      }
      match_user_pages: {
        Args: { filter?: Json; match_count?: number; query_embedding: string }
        Returns: {
          chunk_number: number
          content: string
          file_name: string
          id: number
          metadata: Json
          similarity: number
          summary: string
          title: string
          user_id: string
        }[]
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
