using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UltimateDineSolutions.Data;
using UltimateDineSolutions.Models;

namespace UltimateDineSolutions.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<CustomerController> _logger;

        public CustomerController(ApplicationDbContext context, ILogger<CustomerController> logger)
        {
            _context = context;
            _logger = logger;
        }


        //GET: api/Orders/5
        [HttpGet("{id}")]
        public ActionResult<List<FoodItem>> GetFoods(int id)
        {
            return  _context.FoodItems.ToList();
        
        }


        // POST: api/Orders/placeOrder
        [HttpPost("placeOrder")]
        public async Task<ActionResult<OrderDetails>> PlaceOrder([FromBody] OrderRequest orderRequest)
        {
            if (orderRequest == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {

                var order = new OrderDetails
                {

                    GuestName = orderRequest.GuestName,
                    DateTime = orderRequest.DateTime
                };

                _context.OrderDetails.Add(order);
                await _context.SaveChangesAsync();

                foreach (var item in orderRequest.OrderDetailsItems)
                {
                    var orderDetailsItem = new OrderDetailsItem
                    {
                        OrderDetailsItemId = 0,
                        OrderId = order.OrderId,
                        FoodItemId = item.FoodItemId,
                        Quantity = item.Quantity
                    };

                    _context.OrderDetailsItems.Add(orderDetailsItem);
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                //return CreatedAtAction(nameof(GetOrder), new { id = order.OrderId }, order);
                return StatusCode(200, "Order placed successfully !");
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpGet("getOrderIdBillPrice")]
        public ActionResult<int> getOrderIdBillPrice(int orderId)
        {
            var orderDetailsList = _context.OrderDetailsItems.ToList();

            int sum = 0;

            foreach (var item in orderDetailsList)
            {
                var price = _context.FoodItems.Where(x => x.Id == item.FoodItemId).Select(x => x.Price).FirstOrDefault();
                sum = sum + (Convert.ToInt32(price) * item.Quantity);
            }

            return sum;
        }

        //// GET: api/Orders/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<OrderDetails>> GetOrder(int id)
        //{
        //    var order = await _context.OrderDetails
        //        .Include(o => o.OrderDetailsItems)
        //            .ThenInclude(odi => odi.FoodItemId)
        //        .FirstOrDefaultAsync(o => o.OrderId == id);

        //    if (order == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(order);
        //}
    }
}
