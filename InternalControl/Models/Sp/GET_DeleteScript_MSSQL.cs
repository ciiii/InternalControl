﻿using System;
using System.Data;

namespace InternalControl.Models
{
    /// <summary>
    /// GET_DeleteScript_MSSQL[类]
    /// </summary>
    [Serializable]
	public class GET_DeleteScript_MSSQL 
	{       
              
        #region 属性
        /// <summary>
		/// 
		/// </summary>
		public string DBNAME { get; set; }
        /// <summary>
		/// 
		/// </summary>
		public string TBNAME { get; set; }
        /// <summary>
		/// 
		/// </summary>
		public string SQL { get; set; }
        
          
        #endregion
	}
}