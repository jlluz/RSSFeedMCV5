using System.Web.Mvc;

namespace RSSFeedMCV5.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}