using System;
using System.Data;

namespace InternalControl.Models
{
    /// <summary>
    /// SPBudgetProjectCombine[类]
    /// </summary>
    [Serializable]
	public class SPBudgetProjectCombine 
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
        /// <summary>
		/// 
		/// </summary>
		public int CreatorId { get; set; }
        
          
        #endregion
	}
}