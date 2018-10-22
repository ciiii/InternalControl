using System;
using System.Data;

namespace InternalControl.Models
{
    /// <summary>
    /// BudgetProjectCombine[类]
    /// </summary>
    [Serializable]
	public class BudgetProjectCombine 
	{       
              
        #region 属性
        /// <summary>
		/// 
		/// </summary>
		public DataTable model { get; set; }
        /// <summary>
		/// 
		/// </summary>
		public DataTable listOfSourceBudgetProjectId { get; set; }
        
          
        #endregion
	}
}