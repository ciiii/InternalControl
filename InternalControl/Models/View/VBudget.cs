using System;
using System.Data;
using System.ComponentModel;

namespace InternalControl.Models
{
    /// <summary>
    /// VBudget[类]
    /// </summary>
    [Serializable]
	public partial class VBudget 
	{       
              
        #region 属性
        /// <summary>
		/// 
		/// </summary>
		//public int Id { get; set; }
        public int Id { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int Year { get; set; }
        public int Year { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int OwnDepartmentsId { get; set; }
        public int OwnDepartmentsId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int BudgetTypeId { get; set; }
        public int BudgetTypeId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string BudgetTypeName { get; set; }
        public string BudgetTypeName { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string Name { get; set; }
        public string Name { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int BudgetAmount { get; set; }
        public int BudgetAmount { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string BudgetApproval { get; set; }
        public string BudgetApproval { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string Remark { get; set; }
        public string Remark { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public bool IsFinancialCapital { get; set; }
        public bool IsFinancialCapital { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int TotleAlreadySpent { get; set; }
        public int? TotleAlreadySpent { get; set; }
        
          
        #endregion
	}
}