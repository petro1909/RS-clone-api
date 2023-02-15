import bcrypt from "bcrypt";
export async function hashPassword(unhashedPassword) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(unhashedPassword, salt);
    return hashedPassword;
}
export async function comparePassword(unhashedPassword, hashedPassword) {
    const isEqualPasswords = await bcrypt.compare(unhashedPassword, hashedPassword);
    return isEqualPasswords;
}
