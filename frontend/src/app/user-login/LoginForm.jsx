"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm({ data, onChange, onSubmit, showPassword, toggleShowPassword }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="loginEmail">Email</Label>
        <Input
          id="loginEmail"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={data.email}
          onChange={onChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="loginPassword">Password</Label>
        <div className="relative">
          <Input
            id="loginPassword"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={data.password}
            onChange={onChange}
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={toggleShowPassword}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  );
}