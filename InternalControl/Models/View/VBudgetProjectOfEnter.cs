using System;
using System.Data;
using System.ComponentModel;

namespace InternalControl.Models
{
    /// <summary>
    /// VBudgetProjectOfEnter[类]
    /// </summary>
    [Serializable]
	public partial class VBudgetProjectOfEnter 
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
		//public int BudgetId { get; set; }
        public int BudgetId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string AuditReply { get; set; }
        public string AuditReply { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int CreatorId { get; set; }
        public int CreatorId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public DateTime CreateDatetime { get; set; }
        public DateTime CreateDatetime { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string Remark { get; set; }
        public string Remark { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string BudgetName { get; set; }
        public string BudgetName { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string BudgetTypeName { get; set; }
        public string BudgetTypeName { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public bool IsFinancialCapital { get; set; }
        public bool IsFinancialCapital { get; set; }
        
          
        #endregion
	}
}