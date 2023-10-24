import { isValidEmail, isValidPassword } from "~/utils/helpers";
import { supabaseClient } from "./supabase";

export async function login({ email, password }: { email: string, password: string }) {
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw new Error(error.message);

  console.log(data);
  return data
}


export async function getCurrentUser() {
  const { data } = await supabaseClient.auth.getSession();

  if (!data.session) return null;

  const { data: session, error } = await supabaseClient.auth.getUser();

  if (error) throw new Error(error.message);
  if (!session) throw new Error('The session could not fetched!')

  return session.user
}

export async function logout() {
  const { error } = await supabaseClient.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function register({ fullName, email, password, confirmPassword }: { fullName: string, email: string, password: string, confirmPassword: string }) {

  if (!isValidEmail(email)) throw new Error("Please type a valid email address! ");
  if (!fullName) throw new Error('Please type your full name!');
  if (!isValidPassword(password)) throw new Error('Please type a valid password: At least one lowercase,uppercase,number,symbol should include and at least 8 characters long.')
  if (confirmPassword !== password) throw new Error('The confirmed password does not match the original password. Ensure that passwords you type are equal each other.')

  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: ''
      }
    }
  });
  if (error) throw new Error(error.message);
  if (!data) throw new Error('The signup data could not fetched.')

  return data
}

async function validateCurrentPassword(email: string, password: string) {
  const { error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  })

  if (error) throw new Error("Current password you typed is wrong!");

}

interface UpdateUserRequirements { email: string, fullName?: string, avatar: string, currentPassword?: string, password?: string, confirmPassword?: string }

export async function updateUserData({ email, fullName, currentPassword, password, confirmPassword, avatar }: UpdateUserRequirements) {
  let updateData;

  if (currentPassword) await validateCurrentPassword(email, currentPassword);
  if (password && !isValidPassword(password!)) throw new Error('Please type a valid password: At least one lowercase,uppercase,number,symbol should include and at least 8 characters long.')
  if (password && confirmPassword && confirmPassword !== password) throw new Error('The confirmed password does not match the original password. Ensure that passwords you type are equal each other.')
  if (password) updateData = { password }
  if (fullName) updateData = { data: { fullName, avatar } }

  const { data, error } = await supabaseClient.auth.updateUser(updateData!)

  if (error) throw new Error(error.message);
  if (!data) throw new Error('An error happened while updating user data!');

}