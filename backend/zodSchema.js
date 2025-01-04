
import { z } from "zod";

export const emailSchema = z.string().email();

export const passwordSchema = z.string()
                       .min(3,{message:"password length must be greater than 3"})
                       .max( 10,{message:"password length should not exceed 10"} ) 

