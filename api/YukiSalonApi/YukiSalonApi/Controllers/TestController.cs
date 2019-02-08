using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YukiSalonApi.Resources;

namespace YukiSalonApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TestController : ControllerBase
    {
        [AllowAnonymous]
        [HttpGet]
        public IActionResult Index()
        {
            return Ok();
        }

        [HttpPost("Authenticated")]
        public IActionResult Authenticated()
        {
            return Ok();
        }
    }
}