using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// BudgetType[预算类型   定死 了的:"常规预算,专项预算,其他预算"   其中最后一个是"非财政资金"   第一个每一个年度有且仅有一个常规预算,其他随意      常规预算的名称就是"常规预算",其他的自己起   这个基本不用管,初始化一下就ok类]
    /// </summary>
    [Serializable]
	public partial class BudgetType 
	{       
        #region 属性
        /// <summary>
		/// Id
		/// </summary>
        [DisplayName("Id")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 名称
		/// </summary>
        [DisplayName("名称")]
        [Required(ErrorMessage ="请提供[Name]")]
        [MaxLength(100,ErrorMessage ="Name不能超过[50]字")]
		public string Name { get; set; }
        /// <summary>
		/// 资金来源是否财政资金
		/// </summary>
        [DisplayName("资金来源是否财政资金")]
        [Required(ErrorMessage ="请提供[IsFinancialCapital]")]
		public bool IsFinancialCapital { get; set; }
        /// <summary>
		/// 备注
		/// </summary>
        [DisplayName("备注")]
        [MaxLength(1000,ErrorMessage ="Remark不能超过[500]字")]
		public string Remark { get; set; }
        
        
        #endregion
	}
}