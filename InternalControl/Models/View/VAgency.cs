﻿using System;
using System.Data;
using System.ComponentModel;

namespace InternalControl.Models
{
    /// <summary>
    /// VAgency[类]
    /// </summary>
    [Serializable]
	public partial class VAgency 
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
        public int? LinkmanId { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string LinkmanWorkNumber { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string LinkmanName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string ContactWay { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string ContactNumber { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string Address { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string ProxyMode { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public DateTime? BeginDatetimeOfAgent { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public DateTime? EndDatetimeOfAgent { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int? ComprehensiveScore { get; set; }
        
          
        #endregion
	}
}