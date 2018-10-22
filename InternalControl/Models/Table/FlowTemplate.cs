using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// FlowTemplate[流程模板      一个流程往往以一个为"工作的对象";   但是一个可以作为多个流程的"工作的对象"   例如:请假单      该流程模板的某流程,其详情页面的组件名称   固定一个参数是其"工作的对象"的Id   如:请假单详情?id=1类]
    /// </summary>
    [Serializable]
	public partial class FlowTemplate 
	{       
        #region 属性
        /// <summary>
		/// 编号
		/// </summary>
        [DisplayName("编号")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 来源表名
		/// </summary>
        [DisplayName("来源表名")]
        [Required(ErrorMessage ="请提供[TableName]")]
        [MaxLength(100,ErrorMessage ="TableName不能超过[50]字")]
		public string TableName { get; set; }
        /// <summary>
		/// 流程名称
		/// </summary>
        [DisplayName("流程名称")]
        [Required(ErrorMessage ="请提供[Name]")]
        [MaxLength(100,ErrorMessage ="Name不能超过[50]字")]
		public string Name { get; set; }
        /// <summary>
		/// 组件名称
		/// </summary>
        [DisplayName("组件名称")]
        [Required(ErrorMessage ="请提供[ComponentName]")]
        [MaxLength(100,ErrorMessage ="ComponentName不能超过[50]字")]
		public string ComponentName { get; set; }
        /// <summary>
		/// 备注
		/// </summary>
        [DisplayName("备注")]
        [MaxLength(1000,ErrorMessage ="Remark不能超过[500]字")]
		public string Remark { get; set; }
        
        
        #endregion
	}
}