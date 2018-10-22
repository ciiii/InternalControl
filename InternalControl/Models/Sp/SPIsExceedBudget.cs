using System;
using System.Data;

namespace InternalControl.Models
{
    /// <summary>
    /// SPIsExceedBudget[类]
    /// </summary>
    [Serializable]
	public class SPIsExceedBudget 
	{       
              
        #region 属性
        /// <summary>
		/// 
		/// </summary>
		public int BudgetId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		public DataTable BudgetProjectIdList { get; set; }
        
          
        #endregion
	}
}