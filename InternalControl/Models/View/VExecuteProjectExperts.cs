﻿using System;
using System.Data;
using System.ComponentModel;

namespace InternalControl.Models
{
    /// <summary>
    /// VExecuteProjectExperts[类]
    /// </summary>
    [Serializable]
	public partial class VExecuteProjectExperts 
	{       
              
        #region 属性
        /// <summary>
		/// 
		/// </summary>
		//public int ExecuteProjectId { get; set; }
        public int ExecuteProjectId { get; set; }
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
		//public string ItemName { get; set; }
        public string ItemName { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string Title { get; set; }
        public string Title { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string Company { get; set; }
        public string Company { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string Phone { get; set; }
        public string Phone { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public bool IsOurCompany { get; set; }
        public bool? IsOurCompany { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int DepartmentId { get; set; }
        public int? DepartmentId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string DepartmentName { get; set; }
        public string DepartmentName { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string Remark { get; set; }
        public string Remark { get; set; }
        
          
        #endregion
	}
}