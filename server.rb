require 'debug'
# use binding.break for debug

class Server < Sinatra::Base

    def initialize
        super
        @db = SQLite3::Database.new('db/company.db')
        @db.results_as_hash = true
    end
   
    before do
        #content_type :json    
        #headers 'Access-Control-Allow-Origin' => '*', 
        #    'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST']  
    end
    
    set :protection, false

    get '/' do 
        erb :index
    end

    get '/slow' do
        content_type :json
        sleep 2
        return {result: 'slow'}.to_json
    end

    # Build the app using this route to deliver js for the SPA.
    get '/app' do
        erb :app
    end

    #CRUD-interface med JS
    
    #index
    get '/api/employees' do 
        content_type :json
        @db.execute('SELECT * FROM employees').to_json
    end

    #show
    get '/api/employees/:id' do
        content_type :json
        @db.execute('SELECT * FROM employees WHERE id = ?', params['id']).first.to_json
    end

    #new
    get '/api/employees/new' do
        content_type :json
        {formFields: [{name:  'text'},
            {email: 'text'},
            {phone: 'tel'},
            {department_id: 'number'},
            {img:  'image'}]}.to_json
    end

    #edit
    get '/api/employees/:id/edit' do
        content_type :json
        result = @db.execute('SELECT * FROM employees WHERE id = ?', params['id']).first
        {employee: result,
         formFields: [
            {name: 'name',          type: 'text',   value: result['name']},
            {name: 'email',         type: 'text',   value: result['email']},
            {name: 'phone',         type: 'tel',    value: result['phone']},
            {name: 'department_id', type: 'number', value: result['department_id']},
            {name: 'img',           type: 'img',    value: result['img']}
        ]}.to_json
    end

    #update
    patch '/api/employees/:id' do
        id = params['id']
        payload = request.body.read # data sent using fetch is placed in request body
        content_type :json
        result = @db.execute('UPDATE employees 
            SET name=?, email=?, phone=?, department_id=?, img=?
            WHERE id = ?',
            [payload['name'], payload['email'], payload['phone'], payload['department_id'], payload['img'], payload['id']])
        return {result: 'success'}.to_json                             
    end

    #create
    post '/api/employes/' do
        payload = request.body.read
        content_type :json
        result = @db.execute('INSERT into employees (name, email, phone, department_id, img) 
            VALUES (?,?,?,?,?)',
            payload['name'], payload['email'], payload['phone'], payload['department_id'], payload['img'])
        return {result: 'success'}.to_json        
    end

    #destroy 
    delete '/api/employees/:id' do
        content_type :json
        result = @db.execute('DELETE FROM users WHERE id = ?', params['id'])
        return {result: 'success'}.to_json        
    end




end


