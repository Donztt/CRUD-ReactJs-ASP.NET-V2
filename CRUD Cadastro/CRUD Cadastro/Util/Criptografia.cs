using System.Security.Cryptography;
using System;

namespace CRUD_Cadastro.Util
{
    public class Criptografia
    {
        private const int SaltSize = 32; // Tamanho do salt em bytes
        private const int HashSize = 32; // Tamanho do hash em bytes
        private const int Iterations = 10000; // Número de iterações do algoritmo PBKDF2

        public static string HashSenha(string password)
        {
            // Gera um salt aleatório
            byte[] salt;
            using (var rng = new RNGCryptoServiceProvider())
            {
                salt = new byte[SaltSize];
                rng.GetBytes(salt);
            }

            // Calcula o hash usando PBKDF2
            using (var pbkdf2 = new Rfc2898DeriveBytes(password, salt, Iterations))
            {
                byte[] hash = pbkdf2.GetBytes(HashSize);

                // Combina o salt e o hash em uma string segura para armazenamento
                byte[] hashBytes = new byte[SaltSize + HashSize];
                Array.Copy(salt, 0, hashBytes, 0, SaltSize);
                Array.Copy(hash, 0, hashBytes, SaltSize, HashSize);

                return Convert.ToBase64String(hashBytes);
            }
        }

        public static bool VerificarSenha(string hashedPassword, string inputPassword)
        {
            // Decodifica a string segura para armazenamento em salt e hash
            byte[] hashBytes = Convert.FromBase64String(hashedPassword);
            byte[] salt = new byte[SaltSize];
            Array.Copy(hashBytes, 0, salt, 0, SaltSize);

            // Calcula o hash do input usando PBKDF2 e o salt armazenado
            using (var pbkdf2 = new Rfc2898DeriveBytes(inputPassword, salt, Iterations))
            {
                byte[] hash = pbkdf2.GetBytes(HashSize);

                // Compara o hash calculado com o hash armazenado
                for (int i = 0; i < HashSize; i++)
                {
                    if (hashBytes[i + SaltSize] != hash[i])
                    {
                        return false;
                    }
                }

                return true;
            }
        }
    }
}
