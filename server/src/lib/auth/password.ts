import bcrypt from 'bcryptjs';

export const hashPassword = (password: any) => new Promise((resolve: any, reject: any) => {
  bcrypt.genSalt(10, (saltError: any, salt: any) => {
    if (saltError) reject(saltError)
    bcrypt.hash(password, salt, (hashError: any, hash: any) =>
      hashError ? reject(hashError) : resolve(hash)
    )
  })
})

export const comparePassword = (candidatePassword: any, password: any) =>
  new Promise((resolve: any, reject: any) => {
    if (!password) {
      resolve(false)
    }
    bcrypt.compare(candidatePassword, password, (error: any, isMatch: any) =>
      error ? reject(error) : resolve(isMatch)
    )
  })
