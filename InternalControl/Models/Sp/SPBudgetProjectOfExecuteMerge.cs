﻿using System;
using System.Data;

namespace InternalControl.Models
{
    /// <summary>
    /// SPBudgetProjectOfExecuteMerge[类]
    /// </summary>
    [Serializable]
	public class SPBudgetProjectOfExecuteMerge 
	{       
              
        #region 属性
        /// <summary>
		/// 
		/// </summary>
		public DataTable List { get; set; }
        /// <summary>
		/// 
		/// </summary>
		public DataTable PackageOfExcuteBudgetList { get; set; }
        
          
        #endregion
	}
}