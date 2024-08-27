// SignUp.tsx
"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Login({ onSuccess, currentDialog }) {
  console.log(currentDialog)
  const [isRegistered, setIsRegistered] = useState(currentDialog === "signIn" ? true : false);
  const handleSubmit = (e: any) => {
    e.preventDefault(); // Prevent default form submission
    // Simulate successful login or signup
    setIsRegistered(true);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">{isRegistered ? "Sign In" : "Sign Up"}</h1>
        <p className="text-muted-foreground">
          {isRegistered ? "Enter your credentials to sign in" : "Enter your information to create an account"}
        </p>
      </div>
      <div className="space-y-4">
        {!isRegistered && (
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="" required />
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          {isRegistered ? "Sign In" : "Sign Up"}
        </Button>
      </div>
      <div className="text-center text-sm text-muted-foreground">
        {isRegistered ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          type="button"
          className="font-medium text-primary hover:text-primary-foreground"
          onClick={() => setIsRegistered(!isRegistered)}
        >
          {isRegistered ? "Sign Up" : "Sign In"}
        </button>
      </div>
    </form>
  );
}
