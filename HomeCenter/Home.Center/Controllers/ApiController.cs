using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace Home.Center.Controllers
{
    public class ApiController : Controller
    {

        [HttpGet]
        public JsonResult Apps()
        {
            var appList = new List<App>();
            
            for (int i = 0; i < 4; i++)
            {
                appList.Add(new App
                {
                    Name = "App" + i,
                    Thumbnail = "Thumbnail" + i,
                    Description = "Description" + i,
                    LaunchKey = "Launch" + i
                });
            }
            return new JsonResult(appList);
        }
        
    }

    public class App
    {
        
        public string Name { get; set; }
        
        public string Thumbnail { get; set; }
        
        public string Description { get; set; }

        public string LaunchKey { get; set; }
        
    }
}