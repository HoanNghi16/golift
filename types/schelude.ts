export type metaType = {
    name: string;
    period_type: "day" | "week" | null;
    period_day?: number;
};

export type scheludeDayType = {
    name?: string,
    is_rest_day: boolean,
    exercises?: scheludeExerciseType[]
    note?: string
}

export type scheludeExerciseType ={
    exercise : exerciseType,
    exe_type : "isolate" | "compound"
    rep_range: number | string 
    sets: number
    starting_wight: number
    counting_unit: "Kg" | "Lbs"
}

export type exerciseType = {
    name: string
    muscles_focused : muscleType[]
}

export type muscleType = 
    "lats" | "traps" | "chest" | 
    "biceps" | "triceps" | "forearms" | 
    "quad" | "hamstring" | "adductors" | 
    "glut" | "calf" | "shoulder" | 
    "lower_back" | "paraspinal" | "other"