using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// WorkDay[类]
    /// </summary>
    [Serializable]
	public partial class WorkDay 
	{       
        #region 属性
        /// <summary>
		/// 
		/// </summary>
        [Required(ErrorMessage ="请提供[Day]")]
		public DateTime? Day { get; set; }
        
        
        #endregion
	}
}