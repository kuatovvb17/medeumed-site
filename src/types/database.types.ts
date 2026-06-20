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
      doctors: {
        Row: {
          id: string
          full_name: string
          specialty: string
          experience_years: number
          bio: string | null
          avatar_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          full_name: string
          specialty: string
          experience_years: number
          bio?: string | null
          avatar_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          specialty?: string
          experience_years?: number
          bio?: string | null
          avatar_url?: string | null
          created_at?: string
        }
      }
      services: {
        Row: {
          id: string
          title: string
          category: string
          price: number
          duration_minutes: number
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          category: string
          price: number
          duration_minutes?: number
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          category?: string
          price?: number
          duration_minutes?: number
          created_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          full_name: string
          phone_number: string
          service_type: string
          doctor_id: string
          appointment_date: string
          appointment_time: string
          status: 'pending' | 'confirmed' | 'approved' | 'completed' | 'cancelled'
          created_at: string
        }
        Insert: {
          id?: string
          full_name: string
          phone_number: string
          service_type: string
          doctor_id: string
          appointment_date: string
          appointment_time: string
          status?: 'pending' | 'confirmed' | 'approved' | 'completed' | 'cancelled'
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          phone_number?: string
          service_type?: string
          doctor_id?: string
          appointment_date?: string
          appointment_time?: string
          status?: 'pending' | 'confirmed' | 'approved' | 'completed' | 'cancelled'
          created_at?: string
        }
      }
      available_slots: {
        Row: {
          id: string
          doctor_id: string
          slot_date: string
          slot_time: string
          is_booked: boolean
          created_at: string
        }
        Insert: {
          id?: string
          doctor_id: string
          slot_date: string
          slot_time: string
          is_booked?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          doctor_id?: string
          slot_date?: string
          slot_time?: string
          is_booked?: boolean
          created_at?: string
        }
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
