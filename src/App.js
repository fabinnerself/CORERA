import React from 'react';
import axios from 'axios';
import {
  Messager, DataGrid, GridColumn, Form, Dialog, TextBox, NumberBox, Label, LinkButton, ButtonGroup
} from 'rc-easyui';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      pageSize: 10,
      data: [],
      pagePosition: "bottom",
      filterable: false,
      pageOptions: {
        layout: ['list', 'sep', 'first', 'prev', 'next', 'last', 'sep', 'refresh', 'sep', 'manual', 'info']
      },
      selectionMode: 'single',
      editingRow: null,
      model: {},
      rules: {
        'id': 'required',
        'name': ['required', 'length[3,100]'],
        'description': ['required', 'length[3,100]']
      },
      errors: {},
      title: '',
      closed: true
    };

    // Referencias a los campos de búsqueda
    this.idFilterRef = React.createRef();
    this.nameFilterRef = React.createRef();
    this.descriptionFilterRef = React.createRef();
    this.priceFilterRef = React.createRef();
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.1.10/aprod/');
      this.setState({ data: response.data });
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  saveRow = async () => {
    this.form.validate(async () => {
      if (this.form.valid()) {
        let row = Object.assign({}, this.state.editingRow, this.state.model);
        let url = 'http://192.168.1.10/aprod/';
        let method = 'post';

        if (this.state.editingRow) {
          //url += row.id;
          method = 'put';
        }
        try {
          await axios({
            method: method,
            url: url,
            data: row
          });
          this.fetchData();
          this.setState({ closed: true });
        } catch (error) {
          console.error('Error saving data', error);
        }
      }
    });
  };

  confirm = async (row) => {
    this.messager.confirm({
      title: "Confirmación",
      msg: "Confirmar la eliminación de este registro?",
      result: async (r) => {
        if (r) {
          try {
            await axios.delete('http://192.168.1.10/aprod/', {
              headers: {
                'Content-Type': 'application/json'
              },
              data: {
                id: row.id
              }
            });
            this.fetchData();
          } catch (error) {
            console.error('Error deleting data', error);
          }
        }
      }
    });
  }   

  fn_home = () => {
    window.location.href = 'https://www.google.com';
  };

  fnNuevo = () => {
    this.setState({
      editingRow: null,
      model: {},
      title: 'Adicionar producto',
      closed: false
    });
  };

  editRow = (row) => {
    this.setState({
      editingRow: row,
      model: Object.assign({}, row),
      title: 'Editar producto',
      closed: false
    });
  };

  renderDialog() {
    const row = this.state.model;
    const { title, closed, rules } = this.state;
    return (
      <Dialog modal title={title} closed={closed} onClose={() => this.setState({ closed: true })}>
        <div className="f-full" style={{ padding: '5px 30px' }}>
          <Form className="f-full"
            ref={ref => this.form = ref}
            model={row}
            rules={rules}
            onValidate={(errors) => this.setState({ errors: errors })}
          >
            <div style={{ marginBottom: 10 }}>
              <Label htmlFor="itemid">ID producto:</Label>
              <NumberBox inputId="id" name="id" value={row.id} style={{ width: 110 }}></NumberBox>
              <div className="error">{this.getError('id')}</div>
            </div>
            <div style={{ marginBottom: 10 }}>
              <Label htmlFor="name">Nombre:</Label>
              <TextBox inputId="name" name="name" value={row.name} style={{ width: 320 }}></TextBox>
              <div className="error">{this.getError('name')}</div>
            </div>
            <div style={{ marginBottom: 10 }}>
              <Label htmlFor="description">Descripción:</Label>
              <TextBox inputId="description" name="description" value={row.description} style={{ width: 320 }}></TextBox>
              <div className="error">{this.getError('description')}</div>
            </div>
            <div style={{ marginBottom: 10 }}>
              <Label htmlFor="price">Precio:</Label>
              <NumberBox inputId="price" name="price" value={row.price} style={{ width: 220 }}></NumberBox>
            </div>
          </Form>
        </div>
        <div className="dialog-button">
          <LinkButton style={{ width: 80 }} onClick={this.saveRow} iconCls="icon-ok">Grabar</LinkButton>
          <LinkButton style={{ width: 80 }} onClick={() => this.setState({ closed: true })} iconCls="icon-cancel">Cerrar</LinkButton>
        </div>
      </Dialog>
    );
  }

  getError(name) {
    const { errors } = this.state;
    if (!errors) {
      return null;
    }
    return errors[name] && errors[name].length ? errors[name][0] : null;
  }

  style1() {
    return { margin: '0 2px' };
  }

  style2() {
    return { margin: '0 2px', width: '80px' };
  }

  fn_limpia = () => {
    alert("in limpia pero no funciona")
    /*
    if (this.idFilterRef.current) this.idFilterRef.current.value = '';
    if (this.nameFilterRef.current) this.nameFilterRef.current.value = '';
    if (this.descriptionFilterRef.current) this.descriptionFilterRef.current.value = '';
    if (this.priceFilterRef.current) this.priceFilterRef.current.value = '';
    */

    // Reestablecer el estado del componente para eliminar los filtros
    this.fetchData(); // O actualiza con la llamada a la API si es necesario
  };

  toggleFilterable = () => {
    this.setState(prevState => ({
      filterable: !prevState.filterable
    }));
  };

  render() {
    return (
      <div style={{ padding: '1px 1px 1px 20px' }}>
        <h2 style={{ marginBottom: 10 }}>CRUD Operaciones Productos</h2>
        <div style={{ marginBottom: '20px' }}>
          <LinkButton iconCls="icon-add" style={this.style1()} onClick={this.fnNuevo}>Nuevo</LinkButton>
          <LinkButton onClick={this.toggleFilterable} iconCls="icon-search" style={this.style1()}>Buscar</LinkButton>
          <LinkButton onClick={this.fn_limpia} iconCls="icon-undo" style={this.style1()}>Limpiar</LinkButton>
          <LinkButton onClick={this.fn_home} iconCls="icon-home" style={this.style1()}>Principal</LinkButton>
        </div>
        <div style={{ marginBottom: '80px' }}>
        <DataGrid
            style={{ height: 450, width: 800 }}
            pagination
            filterable
            columnResizing
            {...this.state}
            
          >
            <GridColumn
              field="rn"
              align="center"
              width="30px"
              title="Nro."
              sortable
              cellCss="datagrid-td-rownumber"
              render={({ rowIndex }) => (
                <span>{rowIndex + 1}</span>
              )}
            />
            <GridColumn
              field="id"
              title="Prod Id"
              sortable
              width="40px"
              filterable
            />
            <GridColumn
              field="name"
              title="Nombre Prod"
              sortable
              filterable
            />
            <GridColumn
              field="description"
              title="Descripción"
              sortable
              filterable
            />
            <GridColumn
              field="price"
              title="Precio"
              align="right"
              sortable
              width="100px"
              
              filterable
            />
            <GridColumn
              field="act"
              title="Operaciones"
              align="center"
              width={100}
              render={({ row }) => (
                <div>
                  <ButtonGroup>
                    <LinkButton
                      iconCls="icon-edit"
                      onClick={() => this.editRow(row)}
                    ></LinkButton>
                    <LinkButton
                      iconCls="icon-elim"
                      onClick={() => this.confirm(row)}
                    ></LinkButton>
                  </ButtonGroup>
                  <Messager ref={ref => (this.messager = ref)}></Messager>
                </div>
              )}
            />
          </DataGrid>
          {this.renderDialog()}
        </div>
      </div>
    );
  }
}

export default App;