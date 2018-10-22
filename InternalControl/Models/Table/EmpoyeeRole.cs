using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// EmpoyeeRole[类]
    /// </summary>
    [Serializable]
	public partial class EmpoyeeRole 
	{       
        #region 属性
        /// <summary>
		/// 
		/// </summary>
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 
		/// </summary>
        [Required(ErrorMessage ="请提供[RoleId]")]
		public int RoleId { get; set; }
        /// <summary>
		/// 
		/// </summary>
        [Required(ErrorMessage ="请提供[EmployeeId]")]
		public int EmployeeId { get; set; }
        
        
        #endregion
	}
}