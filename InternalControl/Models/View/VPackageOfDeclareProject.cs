using System;
using System.Data;
using System.ComponentModel;

namespace InternalControl.Models
{
    /// <summary>
    /// VPackageOfDeclareProject[类]
    /// </summary>
    [Serializable]
	public partial class VPackageOfDeclareProject 
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
		//public string Name { get; set; }
        public string Name { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int DeclareProjectId { get; set; }
        public int DeclareProjectId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int BudgetProjectId { get; set; }
        public int BudgetProjectId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int ItemId { get; set; }
        public int ItemId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string ItemKey { get; set; }
        public string ItemKey { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public bool IsCenterPurchase { get; set; }
        public bool IsCenterPurchase { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string ItemName { get; set; }
        public string ItemName { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int DeclareCreatorId { get; set; }
        public int DeclareCreatorId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string DeclareCreatorName { get; set; }
        public string DeclareCreatorName { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int DeclareDepartmentId { get; set; }
        public int? DeclareDepartmentId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string DeclareDepartmentName { get; set; }
        public string DeclareDepartmentName { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string ItemShowName { get; set; }
        public string ItemShowName { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int Quota { get; set; }
        public int? Quota { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int LimitOfPrice { get; set; }
        public int? LimitOfPrice { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public bool IsImported { get; set; }
        public bool IsImported { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string DeclareTechnicalRequirements { get; set; }
        public string DeclareTechnicalRequirements { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int DeclareNumber { get; set; }
        public int DeclareNumber { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int DeclareUnitPrice { get; set; }
        public int DeclareUnitPrice { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string Unit { get; set; }
        public string Unit { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string Attachment { get; set; }
        public string Attachment { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string Remark { get; set; }
        public string Remark { get; set; }
        
          
        #endregion
	}
}