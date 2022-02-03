CREATE TABLE name_version(
    Name VARCHAR(25),
    Version INT,
    Data INT
);


INSERT INTO name_version (Name,Version,Data) VALUES ("John",1,1),
                                                    ("John",2,2),
                                                    ("James",1,3),
                                                    ("James",2,4),
                                                    ("John",3,8),
                                                    ("Jacob",2,5),
                                                    ("James",3,6),
                                                    ("James",4,7),
                                                    ("James",5,9),
                                                    ("Jacob",1,10);



-- Task 1

    SELECT a.name, a.version,a.data
    FROM name_version a
    INNER JOIN (
        SELECT name, MAX(version) ver
        FROM name_version
        GROUP BY name
    ) b ON a.name = b.name AND a.version = b.ver
    ORDER BY a.name;


    CREATE TEMPORARY TABLE tempTable SELECT a.name, a.version,a.data
    FROM name_version a
    INNER JOIN (
        SELECT name, MAX(version) ver
        FROM name_version
        GROUP BY name
    ) b ON a.name = b.name AND a.version = b.ver
    ORDER BY a.name;

    SELECT * FROM tempTable;


-- Task 2
    DROP PROCEDURE IF EXISTS searchProc;
    CREATE Procedure searchProc(charsToSerach VARCHAR(50))
    BEGIN
        DROP TEMPORARY TABLE IF EXISTS result1;
        DROP TEMPORARY TABLE IF EXISTS result2;

        CREATE TEMPORARY TABLE result1 SELECT a.name, a.version,a.data
            FROM name_version a
            INNER JOIN (
                SELECT name, MAX(version) ver
                FROM name_version
                GROUP BY name
            ) b ON a.name = b.name AND a.version = b.ver
            WHERE a.name LIKE CONCAT('%',charsToSerach,'%')
            ORDER BY a.name DESC, a.version ASC;

        SET @maxData = (SELECT MAX(data) FROM result1);
        -- ERROR 1137: Can't reopen table

        CREATE TEMPORARY TABLE result2 SELECT name,version,Max(data)
            FROM result1 WHERE data = @maxData;


        (SELECT * FROM result1) UNION ALL (SELECT * FROM result2);

    END;
    CALL searchProc("Ja");