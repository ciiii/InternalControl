using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;

namespace MyLib
{
    /// <summary>
    /// 
    /// </summary>
    public class MyDynamic
    {
        //用法:
        //public class Product
        //{
        //    public string Name { get; set; }
        //    public IEnumerable<int> Children { get; set; }
        //}

        //[HttpGet]
        //public object tesetdynamic()
        //{
        //    Product p1 = new Product();
        //    p1.Name = "商品名称";
        //    p1.Children = new List<int>() { 1, 2, 3 };


        //    dynamic exProd = ConvertToDynamic(p1);
        //    //下面两个属性都是 在执行期可被扩充出来的
        //    exProd.Description = "叙述";
        //    exProd.NewProperty1 = "我是新属性";

        //    return exProd;
        //}

        /// <summary>
        /// 转成可以扩充的对象
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static dynamic ConvertToDynamic(object obj = null)
        {
            if (obj == null) return new ExpandoObject();
            IDictionary<string, object> result = new ExpandoObject();

            foreach (PropertyDescriptor pro in TypeDescriptor.GetProperties(obj.GetType()))
            {
                result.Add(pro.Name, pro.GetValue(obj));
            }

            return result as ExpandoObject;
        }
    }
}
