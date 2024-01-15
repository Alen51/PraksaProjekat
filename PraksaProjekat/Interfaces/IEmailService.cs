namespace PraksaProjekat.Interfaces
{
    public interface IEmailService
    {
        void SendVerificationMail(string prodavacMail, string statusVerifikacije);
    }
}
