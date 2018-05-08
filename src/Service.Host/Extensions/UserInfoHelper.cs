namespace Linn.DemStock.Service.Host.Extensions
{
    using System.Collections.Generic;
    using System.Security.Claims;
    using System.Threading.Tasks;
    using IdentityModel.Client;

    public static class UserInfoHelper
    {
        public static async Task<IEnumerable<Claim>> GetUserClaimsAsync(string accessToken)
        {
            var discoClient = await DiscoveryClient.GetAsync("https://www-sys.linn.co.uk/auth/.well-known/openid-configuration");

            var userInfoClient = new UserInfoClient(discoClient.UserInfoEndpoint);

            var userInfoResponse = await userInfoClient.GetAsync(accessToken);

            return userInfoResponse.Claims;
        }
    }
}