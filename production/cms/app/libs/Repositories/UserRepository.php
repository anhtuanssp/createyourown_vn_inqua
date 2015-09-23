// <?php 
// namespace Repositories;

// use Doctrine\ORM\EntityRepository;
// use Doctrine\ORM\Tools\Pagination\Paginator;

// class UserRepository extends EntityRepository
// {
//     public function getAllAdminUsers($start,$end)
//     {
//     	$buocnhay = 10;
//         $query = $this->_em
//         ->createQuery("SELECT u FROM Entities\User u")
//         ->setFirstResult($start*$buocnhay)
//         ->setMaxResults($end);

//         $paginator = new Paginator($query, $fetchJoinCollection = true);

//         $c = count($paginator);
// 		foreach ($paginator as $user) {
// 		    echo $user->getUsername() . "\n";
// 		}
//     }
// }