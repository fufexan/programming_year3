use Firma

-- exercitii
-- ex 1.
create function dbo.udf_bottom_3_angajati()
returns table
as
return
        select top 3 A.Nume, A.Prenume, F.Salariu
        from ANGAJATI A
        join FUNCTII F
        on A.IdFunctie = F.IdFunctie
        order by F.Salariu
go

select * from dbo.udf_bottom_3_angajati()

-- ex. 2
create function dbo.udf_bottom_5_prod(@year int, @month int)
returns table
as return
        select top 5 P.Denumire, V.NrProduse, V.DataVanz
        from PRODUSE P
        join VANZARI V
        on V.IDProdus = P.IdProdus
        where V.DataVanz >= DATEFROMPARTS(@year, @month, 1)
        and V.DataVanz <= EOMONTH(DATEFROMPARTS(@year, @month, 1))
        order by V.NrProduse
go

select * from dbo.udf_bottom_5_prod(2021,8)

-- ex. 3
create function dbo.udf_ang_varsta_vechime(@dept varchar(30))
returns table
as return
        select top 5 A.Nume, A.Prenume,
                DATEDIFF(year, A.DataNasterii, GETDATE()) Varsta,
                DATEDIFF(year, A.DataAngajarii, GETDATE()) Vechime,
                D.Denumire
        from Angajati A
        join Departamente D
        on A.IdDept = D.IdDept
        where D.Denumire = @dept
go

select * from dbo.udf_ang_varsta_vechime('PRODUCTIE')

-- Activitati propuse
-- 1.
create function dbo.udf_ang_with_seq(@seq varchar(20))
returns table
as return
        select top 5 A.Nume, A.Prenume, F.Denumire
        from Angajati A
        join Functii F
        on A.IdFunctie = F.IdFunctie
        where F.Denumire like '%' + @seq + '%'
go

select * from dbo.udf_ang_with_seq('MAN')

-- 2.
create function dbo.udf_salar_dept(@dept varchar(20))
returns table
as return
        select top 100 F.Salariu, D.Denumire, COUNT(*) NrAngajati
        from ANGAJATI A
        join FUNCTII F on A.IdFunctie = F.IdFunctie
        join DEPARTAMENTE D on A.IdDept = D.IdDept
        where D.Denumire = @dept
        group by F.Salariu, D.Denumire
go

select * from dbo.udf_salar_dept('PRODUCTIE')

-- 3.
create function dbo.udf_salariu_min_max(@dept varchar(20))
returns table
as return
        select top 100 MIN(F.Salariu) SalariuMin, MAX(F.Salariu) SalariuMax
        from FUNCTII F
        join ANGAJATI A on A.IdFunctie = F.IdFunctie
        join DEPARTAMENTE D on A.IdDept = D.IdDept
        where D.Denumire = @dept
go

select * from dbo.udf_salariu_min_max('MANAGEMENT')

-- 4.
create function dbo.udf_prod_vandute(@mindate DATE, @maxdate DATE)
returns table
as return
        select top 100 P.Denumire Produs, V.DataVanz
        from VANZARI V
        join PRODUSE P on P.IdProdus = V.IDProdus
        where V.DataVanz >= @mindate and V.DataVanz < @maxdate
go

select * from dbo.udf_prod_vandute('2016-05-12', '2022-11-13')

-- 5.
create function dbo.udf_suma_vanz(@name varchar(30))
returns int
begin
        declare @TotalIncasat int;
                select @TotalIncasat = SUM(V.PretVanz)
                from ANGAJATI A
                join VANZARI V on A.IdAngajat = V.IDVanzator
                where A.Nume = @name
        return @TotalIncasat;
end
go

select dbo.udf_suma_vanz('N13')

create function dbo.udf_suma_vanz_higher(@name varchar(30), @threshold int)
returns table
as return
        select top 100 A.Nume, A.Prenume, dbo.udf_suma_vanz(@name) TotalIncasat
        from ANGAJATI A
        join VANZARI V on A.IdAngajat = V.IDVanzator
        where A.Nume = @name
        group by A.Nume, A.Prenume
        having dbo.udf_suma_vanz(@name) > @threshold
go

select * from dbo.udf_suma_vanz_higher('N13', 100)

-- 6.
create function dbo.udf_most_sold(@mindate date, @maxdate date, @num_prod int)
returns table
as return
        select top (@num_prod) P.Denumire Produs, SUM(V.NrProduse) NrProduse
        from PRODUSE P
        join VANZARI V on P.IdProdus = V.IDProdus
        where V.DataVanz >= @mindate and V.DataVanz < @maxdate
        group by P.Denumire
        order by NrProduse desc
go

select * from dbo.udf_most_sold('2012-06-12', '2022-11-13', 10)

-- 7.
create function dbo.udf_clients_spent_top(@mindate date, @maxdate date)
returns table
as return
        select top 100 C.Denumire, SUM(V.PretVanz) TotalCheltuit
        from CLIENTI C
        join VANZARI V on C.IdClient = V.IDClient
        where V.DataVanz >= @mindate and V.DataVanz < @maxdate
        group by C.Denumire
        order by TotalCheltuit desc
go

select * from dbo.udf_clients_spent_top('2012-06-12', '2022-11-13')
