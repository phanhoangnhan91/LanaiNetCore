using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Lanai.Models;
using System.Net.Http;
using System.Net.Http.Headers;
using Lanai.Helpers;
using Newtonsoft.Json;

namespace Lanai.Controllers
{
    [Route("api/[controller]")]
    public class POIsController : Controller
    {

        // GET: api/POIs
        [HttpGet]
        public async Task<ActionResult> Get(POIsCriteria criteria)
        {
            //GetFormId();
            using (var client = new HttpClient())
            {
                try
                {
                    client.BaseAddress = new Uri("https://kc.kobotoolbox.org");
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(
                        "Basic",
                    Convert.ToBase64String(System.Text.Encoding.ASCII.GetBytes($"{Configuration.USERNAME}:{Configuration.PASSWORD}")));
                    string strQuery = BuiltQuery(criteria);
                    var response = await client.GetAsync(strQuery); //31202 for product, 29116 for dev
                    response.EnsureSuccessStatusCode();// Throw in not success
                    var stringResponse = await response.Content.ReadAsStringAsync();
                    //var ps = JsonConvert.DeserializeObject<IList<Object>>(stringResponse);
                    var pois = JsonConvert.DeserializeObject<IList<POI>>(stringResponse);
                    ChangeImage0Name(pois);
                    return Json(new { data = pois });
                }
                catch (HttpRequestException e)
                {
                    Console.WriteLine($"Request exception: {e.Message}");
                    return Json(new { data = 0 });
                }
            }
        }

        private string BuiltQuery(POIsCriteria criteria)
        {
            string strQuery = $"/api/v1/data/{Configuration.FORM_ID}";
            if (!string.IsNullOrEmpty(criteria.ModelType))
            {
                strQuery += "?query={\"modelType\":\"" + criteria.ModelType + "\"}";
            }
            return strQuery;
        }

        /// <summary>
        /// change name to contain user name
        /// </summary>
        /// <param name="pois"></param>
        private void ChangeImage0Name(IList<POI> pois)
        {
            foreach (var p in pois)
            {
                p.image0 = Configuration.USERNAME + "/attachments/" + p.image0;
            }
        }

        /// <summary>
        /// use for get id at the first time
        /// </summary>
        private async void GetFormId()
        {
            using (var client = new HttpClient())
            {
                try
                {
                    client.BaseAddress = new Uri("https://kc.kobotoolbox.org");
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(
                        "Basic",
                    Convert.ToBase64String(System.Text.Encoding.ASCII.GetBytes(string.Format("{0}:{1}", Configuration.USERNAME, Configuration.PASSWORD))));
                    var response = await client.GetAsync("/api/v1/forms?id_string=" + Configuration.FORM_ID_STRING); // Lanai_v2 for product, lainai2 for dev
                    response.EnsureSuccessStatusCode();// Throw in not success
                    var stringResponse = await response.Content.ReadAsStringAsync();
                    var ps = JsonConvert.DeserializeObject<IList<Object>>(stringResponse);
                }
                catch (HttpRequestException e)
                {

                }
            }
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}