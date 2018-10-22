using System;
using System.Data;
using System.ComponentModel;

namespace InternalControl.Models
{
    /// <summary>
    /// VDepartment[类]
    /// </summary>
    [Serializable]
	public partial class VDepartment 
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
		//public int ParentId { get; set; }
        public int ParentId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string Name { get; set; }
        public string Name { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int RoleId { get; set; }
        public int RoleId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string RoleName { get; set; }
        public string RoleName { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int PrincipalId { get; set; }
        public int? PrincipalId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string PrincipalName { get; set; }
        public string PrincipalName { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string PrincipalPhone { get; set; }
        public string PrincipalPhone { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int Sort { get; set; }
        public int Sort { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public bool IsCanChooseThisYear { get; set; }
        public bool? IsCanChooseThisYear { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public DateTime DeclareBeginDatetime { get; set; }
        public DateTime? DeclareBeginDatetime { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public DateTime DeclareEndDatetime { get; set; }
        public DateTime? DeclareEndDatetime { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public DateTime SupplementBeginDatetime { get; set; }
        public DateTime? SupplementBeginDatetime { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public DateTime SupplementEndDatetime { get; set; }
        public DateTime? SupplementEndDatetime { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string Remark { get; set; }
        public string Remark { get; set; }
        
          
        #endregion
	}
}