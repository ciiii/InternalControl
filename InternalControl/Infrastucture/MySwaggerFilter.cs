using Microsoft.AspNetCore.Http;
using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InternalControl.Infrastucture
{
    /// <summary>
    /// swagger文件过滤器
    /// </summary>
    public class SwaggerFileUploadFilter : IOperationFilter
    {
        /// <summary>
        /// swagger过滤器（此处的Apply会被swagger的每个接口都调用生成文档说明，所以在此处可以对每一个接口进行过滤操作）
        /// </summary>
        /// <param name="operation"></param>
        /// <param name="context"></param>
        public void Apply(Operation operation, OperationFilterContext context)
        {
            if (!context.ApiDescription.HttpMethod.Equals("POST", StringComparison.OrdinalIgnoreCase) &&
           !context.ApiDescription.HttpMethod.Equals("PUT", StringComparison.OrdinalIgnoreCase))
            {
                return;
            }
            var apiDescription = context.ApiDescription;

            var parameters = context.ApiDescription.ParameterDescriptions.Where(n => n.Type == typeof(IFormFileCollection) || n.Type == typeof(IFormFile)).ToList();//parameterDescriptions包含了每个接口所带所有参数信息
            if (parameters.Count() <= 0)
            {
                return;
            }
            operation.Consumes.Add("multipart/form-data");

            foreach (var fileParameter in parameters)
            {
                var parameter = operation.Parameters.Single(n => n.Name == fileParameter.Name);
                operation.Parameters.Remove(parameter);
                operation.Parameters.Add(new NonBodyParameter
                {
                    Name = parameter.Name,
                    In = "formData",
                    Description = parameter.Description,
                    Required = parameter.Required,
                    Type = "file",
                    //CollectionFormat = "multi"
                });
            }
        }
    }
}