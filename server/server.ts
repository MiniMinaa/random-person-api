import { z } from "zod";
import express from "express";

//define a schema for a username
const usernameschema = z.string().min(3).max(10);

//test valid data
const validatedUsername = usernameschema.safeParse("Mina123");
console.log(validatedUsername);

//test invalid data
try {
  const validatedUsername = usernameschema.safeParse("Mi");
  console.log(validatedUsername);
} catch (error) {
  console.error(error);
}
