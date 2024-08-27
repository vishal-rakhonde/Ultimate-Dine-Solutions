using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UltimateDineSolutions.Models;
using System.Linq;
using UltimateDineSolutions.Data;

namespace UltimateDineSolutions.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PaymentController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/payment/check
        [HttpPost("check")]
        public IActionResult CheckCardDetails([FromBody] Payment payment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingPayment = _context.Payment
                .FirstOrDefault(p => p.CardNo == payment.CardNo && p.ExpiryDate == payment.ExpiryDate );

            if (existingPayment != null)
            {
                return Ok(new { valid = true, id = existingPayment.Id });
            }

            return Ok(new { valid = false });
        }

        // POST: api/payment/verify
        [HttpPost("verify")]
        public IActionResult VerifyOtp([FromBody] Payment payment)
        {
            if (!ModelState.IsValid || payment.Id <= 0)
            {
                return BadRequest(ModelState);
            }

            var existingPayment = _context.Payment
                .FirstOrDefault(p => p.Id == payment.Id && p.Otp == payment.Otp);

            if (existingPayment != null)
            {
                return Ok(new { valid = true });
            }

            return Ok(new { valid = false });
        }
    }
}
