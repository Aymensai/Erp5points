

(function( $ ) {

	'use strict';

	var EditableTable = {

		options: {
			addButton: '#addToTable',
			table: '#datatable-editable',
			dialog: {
				wrapper: '#dialog',
				cancelButton: '#dialogCancel',
				confirmButton: '#dialogConfirm',
			}
		},

		initialize: function() {
			this
				.setVars()
				.build()
				.events();
		},

		setVars: function() {
			this.$table				= $( this.options.table );
			this.$addButton			= $( this.options.addButton );

			// dialog
			this.dialog				= {};
			this.dialog.$wrapper	= $( this.options.dialog.wrapper );
			this.dialog.$cancel		= $( this.options.dialog.cancelButton );
			this.dialog.$confirm	= $( this.options.dialog.confirmButton );

			return this;
		},

		build: function() {
			this.datatable = this.$table.DataTable({
				aoColumns: [
					null,
					null,
					null,
					null,
					null,
					{ "bSortable": false }
				]
			});

			window.dt = this.datatable;

			return this;
		},

		events: function() {
			var _self = this;

			this.$table
				.on('click', 'a.save-row', function( e ) {
					e.preventDefault();

					_self.rowSave( $(this).closest( 'tr' ) );
				})
				.on('click', 'a.cancel-row', function( e ) {
					e.preventDefault();

					_self.rowCancel( $(this).closest( 'tr' ) );
				})
				.on('click', 'a.edit-row', function( e ) {
					e.preventDefault();

					_self.rowEdit( $(this).closest( 'tr' ) );
				})
				.on( 'click', 'a.remove-row', function( e ) {
					e.preventDefault();

					var $row = $(this).closest( 'tr' );

					$.magnificPopup.open({
						items: {
							src: '#dialog',
							type: 'inline'
						},
						preloader: false,
						modal: true,
						callbacks: {
							change: function() {
								_self.dialog.$confirm.on( 'click', function( e ) {
									e.preventDefault();

									_self.rowRemove( $row );
									$.magnificPopup.close();
								});
							},
							close: function() {
								_self.dialog.$confirm.off( 'click' );
							}
						}
					});
				});

			this.$addButton.on( 'click', function(e) {
				e.preventDefault();

				_self.rowAdd();
			});

			this.dialog.$cancel.on( 'click', function( e ) {
				e.preventDefault();
				$.magnificPopup.close();
			});

			return this;
		},

		// ==========================================================================================
		// ROW FUNCTIONS
		// ==========================================================================================
		rowAdd: function() {
			this.$addButton.attr({ 'disabled': 'disabled' });

			var actions,
			select,
				data,
				$row;

			actions = [
				'<a href="#" class="hidden on-editing save-row"><i class="fa fa-save"></i></a>',
				'<a href="#" class="hidden on-editing cancel-row"><i class="fa fa-times"></i></a>',
				'<a href="#" class="on-default edit-row"><i class="fa fa-pencil"></i></a>',
				'<a href="#" class="on-default remove-row"><i class="fa fa-trash-o"></i></a>'
			].join(' ');
			select = [
				'<select  id="q_sel"></select>'

			];

			data = this.datatable.row.add([ '', '', '',select, '', actions ]);
			$row = this.datatable.row( data[0] ).nodes().to$();

			$row
				.addClass( 'adding' )
				.find( 'td:last' )
				.addClass( 'actions' );

				this.rowEdit( $row );

			// this.rowEdit( $row );

			this.datatable.order([0,'asc']).draw(); // always show fields
		},

		rowCancel: function( $row ) {
			var _self = this,
				$actions,
				i,
				data;

			if ( $row.hasClass('adding') ) {
				this.rowRemove( $row );
			} else {

				data = this.datatable.row( $row.get(0) ).data();
				this.datatable.row( $row.get(0) ).data( data );

				$actions = $row.find('td.actions');
				if ( $actions.get(0) ) {
					this.rowSetActionsDefault( $row );
				}

				this.datatable.draw();
			}
		},

		rowEdit: function( $row ) {
			var _self = this,
				data;


			data = this.datatable.row( $row.get(0) ).data();
			
			$row.children( 'td' ).each(function( i ) {
				var $this = $( this );
				if ( $this.hasClass('actions')) {
					_self.rowSetActionsEditing( $row );
				} else if(!(this.classList.value.split(' ').includes("not-editable")) && !(this.classList.value.split(' ').includes("category")) ) {
					$this.html( '<input type="text" class="form-control input-block" value="' + data[i] + '"/>' );
				}else if((this.classList.value.split(' ').includes("category"))){
					$this.html( '<select id="categoryEdit"></select>' );
					let categ = JSON.parse(localStorage.getItem("category"));
					let category = document.querySelector("#categoryEdit");

					let gen_cat = i => {
					let cat = document.createElement("option");
					cat.text = i;
					cat.value = i;
					category.add(cat);
					};
					categ.forEach(cat =>{
						gen_cat(cat);
					});
				}				
			});
			
		},

		rowSave: function( $row ) {
			var _self     = this,
				$actions,
				values    = [];

			if ( $row.hasClass( 'adding' ) ) {
				this.$addButton.removeAttr( 'disabled' );
				$row.removeClass( 'adding' );
			}

			values = $row.find('td').map(function() {
				var $this = $(this);
				// console.log($this);
				
				if ( $this.hasClass('actions') ) {
					_self.rowSetActionsDefault( $row );
					return _self.datatable.cell( this ).data();
				} else if ($this.hasClass('not-editable')) {
					return _self.datatable.cell( this ).data();
				} else {
					return $.trim( $this.find('input').val() );
				}
			});
		

			this.datatable.row( $row.get(0) ).data( values );
			
			const data = this.datatable.row( $row.get(0) ).data();
			const cat = $('#categoryEdit').val();
			const newCat = $('#categoryEdit :selected').text();
			console.log(cat ,newCat);
			
						
			const id = data[0]
			const name = data[1]
			const quantity = data[2]
			const category = data[3]
			// console.log(data);
			
			// const time = data[4]
			let stocks = JSON.parse(localStorage.getItem('stocks'));
			let stock = stocks.find(s=>s.prod_id==id)
			let now = new Date();
			

			if(stock.prod_qt != quantity){
				let diff = Math.abs(stock.prod_qt - quantity);
				let st = {
					prod_id: "",
					prod_name: "",
					prod_cat: "",
					prod_qt: "",
					prod_time: ""
				};
				if(stock.prod_qt < quantity){
					st.prod_qt = "+" + diff;
				}else{
					st.prod_qt = "-" + diff;
				};
				st.prod_id = stock.prod_id
				st.prod_name = stock.prod_name
				st.prod_cat = stock.prod_cat
				st.prod_time = dateFns.format(new Date(new Date()), 'DD/MM/YY H:mm')
				stock.prod_time = new Date(new Date());
				let stockHist = JSON.parse(localStorage.getItem("stockHist")) || [];
				stockHist.push(st);
				localStorage.setItem("stockHist", JSON.stringify(stockHist));
			}

			stock.prod_name = name;
			stock.prod_qt = quantity;
			stock.prod_cat = category;
			localStorage.setItem('stocks', JSON.stringify(stocks));

			$actions = $row.find('td.actions');
			if ( $actions.get(0) ) {
				this.rowSetActionsDefault( $row );
			}

			this.datatable.draw();
		},

		rowRemove: function( $row ) {
			if ( $row.hasClass('adding') ) {
				this.$addButton.removeAttr( 'disabled' );
			}

			this.datatable.row( $row.get(0) ).remove().draw();
		},

		rowSetActionsEditing: function( $row ) {
			$row.find( '.on-editing' ).removeClass( 'hidden' );
			$row.find( '.on-default' ).addClass( 'hidden' );
		},

		rowSetActionsDefault: function( $row ) {
			$row.find( '.on-editing' ).addClass( 'hidden' );
			$row.find( '.on-default' ).removeClass( 'hidden' );
		}

	};

	$(function() {
		EditableTable.initialize();
	});

}).apply( this, [ jQuery ]);