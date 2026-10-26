export interface User {
    id?: string;
    user_id?: string;
    clerk_user_id?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    image_url?: string;
}

export interface UserProfile {
    profile_id?: number | string;
    user_id?: string;
    clerk_user_id?: string;
    age?: number;
    weight_kg?: number;
    height_cm?: number;
    goal?: string;
    activity_level?: string;
    updated_at?: string;
}

export interface Meal {
    meal_id?: number | string;
    user_id?: string;
    clerk_user_id?: string;
    name: string;
    calories?: number;
    protein?: number;
    carbs?: number;
    fats?: number;
    meal_type?: string;
    logged_at: string;
}

export interface WaterLog {
    log_id?: number | string;
    user_id?: string;
    clerk_user_id?: string;
    amount_ml: number;
    logged_at: string;
}

export interface Habit {
    habit_id?: number | string;
    user_id?: string;
    clerk_user_id?: string;
    name: string;
    frequency?: string;
    streak: number;
    created_at: string;
}

export interface HabitLog {
    log_id: number;
    habit_id: number;
    completed_at: string;
}

export interface Trainer {
    trainer_id: number;
    name: string;
    specialty?: string;
    bio?: string;
    rating: number;
    price_per_session?: number;
    avatar_url?: string;
}

export interface Booking {
    booking_id: number;
    clerk_user_id: string;
    trainer_id: number;
    session_date: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    notes?: string;
}

export interface ChatMessage {
    message_id: number;
    clerk_user_id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    created_at: string;
}

export interface Product {
    product_id: number;
    name: string;
    description?: string;
    price: number;
    category?: string;
    image_url?: string;
    stock: number;
}

export interface CartItem {
    cart_id: number;
    clerk_user_id: string;
    product_id: number;
    quantity: number;
    added_at: string;

    // joined fields
    name?: string;
    price?: number;
    image_url?: string;
    description?: string;
}
