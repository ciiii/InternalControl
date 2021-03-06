﻿using System;
using System.Data;
using System.ComponentModel;

namespace InternalControl.Models
{
    /// <summary>
    /// VEmployee[类]
    /// </summary>
    [Serializable]
	public partial class VEmployee 
	{       
              
        #region 属性
        /// <summary>
		/// 
		/// </summary>
        public int Id { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string WorkNumber { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string Phone { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string Name { get; set; }
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
        public int? RoleId { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string RoleName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string Sex { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string DutyName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string PostName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string PostType { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string Remark { get; set; }
        
          
        #endregion
	}
}