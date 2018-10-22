using System;
using System.Data;
using System.ComponentModel;

namespace InternalControl.Models
{
    /// <summary>
    /// VPackageOfExcuteBudget[类]
    /// </summary>
    [Serializable]
	public partial class VPackageOfExcuteBudget 
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
		//public string PackageName { get; set; }
        public string PackageName { get; set; }
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
		//public int ExecuteProjectId { get; set; }
        public int ExecuteProjectId { get; set; }
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
		//public string ItemShowName { get; set; }
        public string ItemShowName { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public bool IsImported { get; set; }
        public bool IsImported { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int SerialNumber { get; set; }
        public int? SerialNumber { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string ExecuteTechnicalRequirements { get; set; }
        public string ExecuteTechnicalRequirements { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int ExecuteNumber { get; set; }
        public int ExecuteNumber { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int ExecuteUnitPrice { get; set; }
        public int ExecuteUnitPrice { get; set; }
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