using System;
using System.Data;
using System.ComponentModel;

namespace InternalControl.Models
{
    /// <summary>
    /// VExpert[类]
    /// </summary>
    [Serializable]
	public partial class VExpert 
	{       
              
        #region 属性
        /// <summary>
		/// 
		/// </summary>
        public int Id { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string Name { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string ItemName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string Title { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string Company { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string Phone { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public bool? IsOurCompany { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int? DepartmentId { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string DepartmentName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string Remark { get; set; }
        
          
        #endregion
	}
}