import { z } from "zod";
import express from "express";

const app = express();
app.use(express.json());
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/ping", (rep, res) => {
  res.json({ message: "pong" });
});

const randomUserSchema = z.object({
  results: z.array(
    z.object({
      name: z.object({
        first: z.string(),
        last: z.string(),
      }),
      country: z.string(),
    }),
  ),
});

//route

app.get("/random-user", async (req, res) => {
  try {
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();

    const validatedRandomUser = randomUserSchema.safeParse(data);

    if (!validatedRandomUser.success) {
      return res.status(500).json({
        error: "Invalid data from RandomUser API",
        details: validatedRandomUser.error,
      });
    }

    const user = validatedRandomUser.data.results[0];

    res.json({
      name: `${user?.name.first} ${user?.name.last}`,
      country: user?.country,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch random user",
    });
  }
});

/*
//define a schema for a username
const user = { name: "Mina123", age: 24 };

const userschema = z.object({
  name: z.string().min(3).max(10),
  age: z
    .number()
    .min(18, { message: "You must be at least 18 years old." })
    .max(100, { message: "you must be at most be 100 years old" })
    .optional()
    .default(28),
  email: z.email(),
});





const validatedUsername = userschema.safeParse(user);

if (!validatedUsername.success) {
  console.error(validatedUsername.error);
} else {
  console.log(validatedUsername.data);
}

app.post("/users", (req, res) => {
  const validatedNewUser = userschema.safeParse(req.body);
  if (!validatedNewUser.success) {
    return res.status(400).json({
      error: "Invalid user data",
      details: validatedNewUser.error,
    });
    //console.error(validatedNewUser.error);
  } else {
    res.status(201).json({ user: validatedNewUser });
  }
});
*/
